export function formatDateToDefault(date: string) {
  const data = new Date(date);
  const dia = data.getDate().toString().padStart(2, '0');
  const mes = (data.getMonth() + 1).toString().padStart(2, '0');
  const ano = data.getFullYear().toString();
  const dataFormatada = `${dia}/${mes}/${ano}`;

  return dataFormatada
}