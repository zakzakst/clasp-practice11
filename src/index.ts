import { getDriveImageBlob_ } from "./utils/drive/getDriveImageBlob";
import { getDriveImages_ } from "./utils/drive/getDriveImages";

/**
 * HTMLテンプレートから別HTMLファイルの中身を取り込む（styles/app 用）。
 * @param filename HTMLファイル名
 * @returns ファイルの中身
 */
const include = (filename: string): string => {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
};

const IMAGE_WIDTH = 300;

function insertDriveImagesToSpreadsheet(): void {
  const ui = SpreadsheetApp.getUi();
  const folderResponse = ui.prompt(
    "画像フォルダID",
    "挿入する画像が保存されているGoogle DriveフォルダのIDを入力してください。",
    ui.ButtonSet.OK_CANCEL,
  );
  if (folderResponse.getSelectedButton() !== ui.Button.OK) return;

  const folderId = folderResponse.getResponseText().trim();
  if (!folderId) {
    ui.alert("フォルダIDを入力してください。");
    return;
  }

  const spreadsheetResponse = ui.prompt(
    "スプレッドシートID",
    "画像を挿入するスプレッドシートのIDを入力してください。",
    ui.ButtonSet.OK_CANCEL,
  );
  if (spreadsheetResponse.getSelectedButton() !== ui.Button.OK) return;

  const spreadsheetId = spreadsheetResponse.getResponseText().trim();
  if (!spreadsheetId) {
    ui.alert("スプレッドシートIDを入力してください。");
    return;
  }

  const images = getDriveImages_(folderId);
  const sheet = SpreadsheetApp.openById(spreadsheetId).getSheets()[0];
  let nextRow = 1;

  images.forEach((imageFile) => {
    const image = sheet.insertImage(
      getDriveImageBlob_(imageFile.id),
      1,
      nextRow,
    );
    image.setWidth(IMAGE_WIDTH);

    let occupiedHeight = 0;
    const imageHeight = image.getHeight();
    while (occupiedHeight < imageHeight) {
      occupiedHeight += sheet.getRowHeight(nextRow);
      nextRow++;
    }
  });

  ui.alert(`${images.length}件の画像を挿入しました。`);
}
