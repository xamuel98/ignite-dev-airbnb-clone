export default function date(value: string) {
    // Ensure value is valid
    if (!value) return '';
  
    const date = new Date(value)
    return date.toLocaleString(['en-US'], {
        month: 'short',
        day: '2-digit',
    });
};
