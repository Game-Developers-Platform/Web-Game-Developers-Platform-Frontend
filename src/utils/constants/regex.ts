export const getPlatformRegex = (platform: string): RegExp => {
  switch (platform) {
    case "LinkedIn":
      return /^(https?:\/\/)?(www\.)?linkedin\.com\/.*$/;
    case "Facebook":
      return /^(https?:\/\/)?(www\.)?facebook\.com\/.*$/;
    case "Github":
      return /^(https?:\/\/)?(www\.)?github\.com\/.*$/;
    case "Twitter":
      return /^(https?:\/\/)?(www\.)?twitter\.com\/.*$/;
    case "Youtube":
      return /^(https?:\/\/)?(www\.)?youtube\.com\/.*$/;
    case "Discord Server":
      return /^(https?:\/\/)?(www\.)?discord\.com\/.*$/;
    default:
      return /^.*$/;
  }
};
