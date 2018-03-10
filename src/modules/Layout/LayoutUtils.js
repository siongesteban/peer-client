export const updateThemeColor = (color) => {
  const themeColorMeta = document.getElementsByTagName('meta');
  themeColorMeta['theme-color'].setAttribute('content', color);
  themeColorMeta['msapplication-TileColor'].setAttribute('content', color);
}