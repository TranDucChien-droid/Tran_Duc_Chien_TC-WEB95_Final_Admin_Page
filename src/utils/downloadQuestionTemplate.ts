import * as XLSX from "xlsx";

const HEADERS = ["Question", "Type", "Option1", "Option2", "Option3", "Option4", "CorrectAnswers"];

const SAMPLE_ROWS: string[][] = [
  ["What is the capital of France?", "single", "London", "Paris", "Berlin", "Madrid", "2"],
  ["Which are programming languages?", "multiple", "Python", "HTML", "JavaScript", "CSS", "1,3"],
];

export function downloadQuestionImportTemplate(filename = "question-import-template.xlsx") {
  const sheet = XLSX.utils.aoa_to_sheet([HEADERS, ...SAMPLE_ROWS]);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, sheet, "Questions");
  XLSX.writeFile(workbook, filename);
}
