export default function currency(value: number) {
    // Ensure value is valid
    if (!value && value !== 0) return '';

    // Convert the number to a string
    const stringValue = value.toString();
  
    // Check if the value has no decimal places
    if (stringValue.indexOf('.') === -1) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(parseFloat(stringValue));
    }

    // Format the value with currency and truncate .00
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(parseFloat(stringValue));
};