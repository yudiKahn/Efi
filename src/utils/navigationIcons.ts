const navigationIcons: Record<string, string> = {
  '/mezuza': '/Atika-Kadisha/images/mezuza.png',
  '/tefillin': '/Atika-Kadisha/images/tefillin.png',
  '/sefer-torah': '/Atika-Kadisha/images/sefer-torah.png',
  '/megilla': '/Atika-Kadisha/images/megila.png',
}

export function getNavigationIcon(path: string) {
  return navigationIcons[path]
}
