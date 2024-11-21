export const formatDate = (dateString: string | undefined | null) => {
  if (!dateString) {
    return "-";
  }

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "-";
    }
    return date.toISOString().split("T")[0];
  } catch (error) {
    console.error("Date formatting error:", error);
    return "-";
  }
};
