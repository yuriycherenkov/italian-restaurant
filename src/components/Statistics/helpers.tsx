export const renderDate = (params: any) => {
  const date = params.value || '';
  return new Intl.DateTimeFormat('en', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(date));
};
