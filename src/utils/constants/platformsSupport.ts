import steamLogo from "../../assets/icons/logo-steam.svg";
import eaLogo from "../../assets/icons/logo-ea.svg";
import epicGamesLogo from "../../assets/icons/logo-epic-games.svg";
import xboxLogo from "../../assets/icons/logo-xbox.svg";
import facebookLogo from "../../assets/icons/logo-facebook.svg";
import youtubeLogo from "../../assets/icons/logo-youtube.svg";
import xLogo from "../../assets/icons/logo-x.svg";
import githubLogo from "../../assets/icons/logo-github.svg";
import linkedinLogo from "../../assets/icons/logo-linkedin.svg";

export const platformLogoMap = new Map<string, string>([
  ["Steam", steamLogo],
  ["EA", eaLogo],
  ["Epic Games", epicGamesLogo],
  ["Xbox", xboxLogo],
]);

export const socialNetworksLogoMap = new Map<string, string>([
  ["Facebook", facebookLogo],
  ["Youtube", youtubeLogo],
  ["X", xLogo],
  ["Github", githubLogo],
  ["LinkedIn", linkedinLogo],
]);
