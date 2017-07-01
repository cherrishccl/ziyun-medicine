package com.oxchains.pharmacy.utils;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.Optional;

import static java.util.Optional.empty;

/**
 * @author aiet
 */
public class ResponseUtil {

  private static final Logger LOG = LoggerFactory.getLogger(ResponseUtil.class);
  private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

  public static Optional<String> extract(String json, String path) {
    try {
      JsonNode root = OBJECT_MAPPER.readTree(json);
      JsonNode data = root.at(path);
      if(data.isArray()) data = data.get(0);
      return Optional.ofNullable(data.isObject() ? data.toString() : data.textValue());
    } catch (Exception e) {
      LOG.error("failed to extract value under path {} out of {}: {}", path, json, e.getMessage());
    }
    return empty();
  }

  public static <T> T resolve(String json, Class<T> tClass) {
    try {
      return OBJECT_MAPPER.readValue(json, tClass);
    } catch (IOException e) {
      LOG.error("failed to resolve data to {}: {}, cause: {}", tClass, json, e.getMessage());
    }
    return null;
  }

}
