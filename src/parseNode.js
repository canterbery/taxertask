export function parseNode(node, result) {
  if (node.sub == null) return result;

  node.sub.forEach((element) => {
    if (
      result["issuer"] &&
      !result["subject"] &&
      element.sub &&
      element.sub.length === 2 &&
      element.sub[0].typeName() === "UTCTime" &&
      element.sub[1].typeName() === "UTCTime"
    ) {
      result["valid_from"] = element.sub[0].content();
      result["valid_to"] = element.sub[1].content();
    }

    if (element.typeName() === "SET") {
      if (element.sub[0].typeName() === "SEQUENCE") {
        let prefix = "";

        if (result["issuer"] && result["issuer"] === node.sub) {
          prefix = "issuer_";
        }

        if (!result["issuer"]) {
          result["issuer"] = node.sub;
          prefix = "issuer_";
        } else if (result["issuer"] && result["issuer"] !== node.sub) {
          result["subject"] = node.sub;
          prefix = "subject_";
        }

        let key = element.sub[0].sub[0].content();

        key = key.slice(key.indexOf("\n") + 1, key.lastIndexOf("\n"));
        result[prefix + key] = element.sub[0].sub[1].content();
      }
    }
    parseNode(element, result);
  });

  return result;
}
