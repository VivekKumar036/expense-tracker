export function exportToCSV(filename, rows) {
  if (!rows || !rows.length) {
    alert("No data to export");
    return;
  }

  const headers = Object.keys(rows[0]);
  const csvContent = [
    headers.join(","), // header row
    ...rows.map(row =>
      headers.map(h => `"${row[h] ?? ""}"`).join(",")
    )
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
