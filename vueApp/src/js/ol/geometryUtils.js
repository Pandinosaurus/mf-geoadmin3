export class GeometryUtils {

  // no constructor needed a.t.m

  /**
   * Private methods
   */

  // Ensure linear ring is closed
  _closeLinearRing(linearRing) {
    var first = linearRing.getFirstCoordinate();
    var last = linearRing.getLastCoordinate();
    if (first[0] !== last[0] || first[1] !== last[1] ||
        first[2] !== last[2]) {
      var coords = linearRing.getCoordinates();
      coords.push(linearRing.getFirstCoordinate());
      linearRing.setCoordinates(coords);

    }
  }

  // Ensure valid linear ring
  _isValidLinearRing(linearRing) {
    var coords = linearRing.getCoordinates();
    if (coords.length <= 3) {
      return false;
    }
    return true;
  }

  // Ensure polygon is closed
  _closePolygon(polygon) {
    var coords = [];
    var linearRings = polygon.getLinearRings();
    for (var i = 0, ii = linearRings.length; i < ii; i++) {
      closeLinearRing(linearRings[i]);
      coords.push(linearRings[i].getCoordinates());
    }
    polygon.setCoordinates(coords);
  }

  // Ensure multi polygon is closed
  _closeMultiPolygon(multiPolygon) {
    var coords = [];
    var polygons = multiPolygon.getPolygons();
    for (var i = 0, ii = polygons.length; i < ii; i++) {
      closePolygon(polygons[i]);
      coords.push(polygons[i].getCoordinates());
    }
    multiPolygon.setCoordinates(coords);
  }

  // Tests if a multi geom should be removed
  _isValidMultiGeom(geometry, children) {
    var coords = [];
    for (var i = 0, ii = children.length; i < ii; i++) {
      if (this.isValid(children[i])) {
        coords.push(children[i].getCoordinates());
      }
    }
    if (coords.length) {
      geometry.setCoordinates(coords);
      return true;
    }
    return false;
  }

  demo(name) {
    return name + 'works!'
  }

  /**
   * Detects if an array of coords contains unique value
   */
  hasUniqueCoord(coords) {
    for (var i = 0, ii = coords.length; i < ii; i++) {
      var coord = coords[i];
      var nextCoord = coords[i + 1];
      if (nextCoord &&
          (coord[0] !== nextCoord[0] ||
          coord[1] !== nextCoord[1] ||
          coord[2] !== nextCoord[2])) {
        return false;
      }
    }
    return true;
  }

  isValid(geom) {
    if (!geom) {
      return false;
    }
    var geometries = [geom];
    if (geom instanceof ol.geom.GeometryCollection) {
      geometries = geom.getGeometries();
    }
    for (var i = 0, ii = geometries.length; i < ii; i++) {
      var geometry = geometries[i];
      var isValid = true;
      if (geometry instanceof ol.geom.MultiPolygon) {
        isValid = isValidMultiGeom(this, geometry,
            geometry.getPolygons());
      } else if (geometry instanceof ol.geom.MultiLineString) {
        isValid = isValidMultiGeom(this, geometry,
            geometry.getLineStrings());
      } else if (geometry instanceof ol.geom.Polygon) {
        isValid = isValidMultiGeom(this, geometry,
            geometry.getLinearRings());
      } else if (geometry instanceof ol.geom.LinearRing) {
        isValid = isValidLinearRing(geometry) &&
          !this.hasUniqueCoord(geometry.getCoordinates());
      } else if (geometry instanceof ol.geom.LineString) {
        isValid = !this.hasUniqueCoord(geometry.getCoordinates());
      }
      if (!isValid) {
        geometries.splice(i, 1);
        i--;
      }
    }
    if (geometries.length && geom instanceof ol.geom.GeometryCollection) {
      geom.setGeometries(geometries);
      return true;
    }
    return !!geometries.length;
  }

  close(geom) {
    var geometries = [geom];
    if (geom instanceof ol.geom.GeometryCollection) {
      geometries = geom.getGeometries();
    }
    for (var i = 0, ii = geometries.length; i < ii; i++) {
      var geometry = geometries[i];
      if (geometry instanceof ol.geom.MultiPolygon) {
        closeMultiPolygon(geometry);
      } else if (geometry instanceof ol.geom.Polygon) {
        closePolygon(geometry);
      } else if (geometry instanceof ol.geom.LinearRing) {
        closeLinearRing(geometry);
      }
    }
    if (geom instanceof ol.geom.GeometryCollection) {
      geom.setGeometries(geometries);
    }
  }

  // Transform a multiLineString into LineString if possible
  multiLineStringToLineString(geom) {
    if (!(geom instanceof ol.geom.MultiLineString)) {
      return geom;
    }
    var lineStrings = geom.getLineStrings();
    var coords = [];
    for (var i = 0, ii = lineStrings.length; i < ii; i++) {
      var curr = lineStrings[i];
      var next = lineStrings[i + 1];
      var last = curr.getLastCoordinate();
      if (!next || (last[0] === next.getFirstCoordinate()[0] ||
            last[1] === next.getFirstCoordinate()[1])) {
        coords = coords.concat(curr.getCoordinates());
      } else {
        // LineStrings are not connected.
        coords.length = 0;
        break;
      }
    }
    if (coords.length) {
      geom = new ol.geom.LineString(coords);
    }
    return geom;
  }

  // Transform GeomCollection or MultiXXX geometries in a single geometry
  // if possible otherwise returns the initial geometry.
  multiGeomToSingleGeom(geom) {
    if (geom instanceof ol.geom.GeometryCollection &&
        geom.getGeometries().length === 1) {
      geom = this.multiGeomToSingleGeom(geom.getGeometries()[0]);
    }
    if (geom instanceof ol.geom.MultiPoint &&
        geom.getPoints().length === 1) {
      geom = geom.getPoints()[0];
    } else if (geom instanceof ol.geom.MultiLineString &&
        geom.getLineStrings().length === 1) {
      geom = geom.getLineStrings()[0];
    } else if (geom instanceof ol.geom.MultiPolygon &&
        geom.getPolygons().length === 1) {
      geom = geom.getPolygons()[0];
    } else if (geom instanceof ol.geom.MultiLineString) {
      geom = this.multiLineStringToLineString(geom);
    }
    return geom;
  }

  // Simplify a geometry only if the number of coordinates exceeds
  // nbPointsMax
  simplify(geom, nbPointsMax) {
    if (!(geom instanceof ol.geom.LineString) || !nbPointsMax ||
        geom.getCoordinates().length <= nbPointsMax) {
      return geom;
    }
    // Magic number coming from service-alti
    // https://github.com/geoadmin/service-alti/blob/master/alti/views/profile.py#L53
    return geom.simplify(12.5);
  }
    
}
