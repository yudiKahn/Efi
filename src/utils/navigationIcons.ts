const navigationIcons: Record<string, string> = {
  '/mezuza': '/Efi/images/mezuza.png',
  '/tefillin': '/Efi/images/tefillin.png',
  '/sefer-torah': '/Efi/images/sefer-torah.png',
  '/megilla': '/Efi/images/megila.png',
}

export function getNavigationIcon(path: string) {
  return navigationIcons[path]
}
