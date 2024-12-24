const getSectionAttributesSlug = (payload: object) => {
  return Object.entries(payload)
    .filter(([key]) => key.includes("-custom"))
    .map(([key, value]) => {
      const [baseKey, suffix] = key.split("-custom-");

      return { value: value, type: suffix, attributeSlug: baseKey };
    });
};

export default getSectionAttributesSlug;
