/** 
parseAmount function is meant to parse the transaction
amounts from strings to numbers e.g. "123" to 123, 
and clean any non-numeric values that may be present
*/
export function parseAmount(
    amount: string | null | undefined): number {
    if (!amount) return 0;
    
    /**This is RegEx to remove any non-numeric characters 
    except decimal points and minus signs*/
    const cleaned_amount = amount.replace(/[^0-9.-]+/g, "");
    
    // converts cleaned_amount to a number type
    const parsed_amount = parseFloat(cleaned_amount);
    return isNaN(parsed_amount) ? 0 : parsed_amount
}

/** 
normalizeGender function is meant to normalize the gender
values to handle cases such as "male","FEMALE", "non-binary" 
to return 3 capitalized standard values of either Male, Female or Other
*/
export function normalizeGender(
  gender: string | null | undefined
): "Male" | "Female" | "Other" {
  if (!gender) return "Other";

  // removes any whitespace and converts it to lowercase
  const normalized_gender = gender.trim().toLowerCase();

  if (["m", "male"].includes(normalized_gender)) return "Male";
  if (["f", "female"].includes(normalized_gender)) return "Female";

  return "Other";
}

export function parseDate(
    dateString: string | null | undefined): Date | null {
  if (!dateString) return null;

  // Try native Date parsing first
  const parsed = new Date(dateString);
  if (!isNaN(parsed.getTime())) return parsed;

  // Try MM/DD/YYYY format explicitly
  const parts = dateString.split("/");
  if (parts.length === 3) {
    const [month, day, year] = parts.map(Number);
    if (year && month && day) {
      const d = new Date(year, month - 1, day);
      return isNaN(d.getTime()) ? null : d;
    }
  }

  return null;
}


