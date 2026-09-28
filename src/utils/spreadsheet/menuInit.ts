export type MenuItem = {
  label: string;
  name: string;
};

/**
 * ナビゲーションに「メニュー」を表示する
 * @params items 表示するメニューの一覧
 */
export const menuInit_ = (items: MenuItem[]) => {
  const menu = SpreadsheetApp.getUi().createMenu("メニュー");
  items.forEach((item) => {
    menu.addItem(item.label, item.name);
  });
  menu.addToUi();
};
