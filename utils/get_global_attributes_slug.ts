const getGlobalAttributesSlug = (payload: object) => {
  return Object.entries(payload)
    .filter(([key]) => key.includes("-global"))
    .map(([key, value]) => {
      const [baseKey, suffix] = key.split("-global-");

      return { value: value, type: suffix, attributeSlug: baseKey };
    });
};

export default getGlobalAttributesSlug;
