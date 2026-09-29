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

function doGet(): GoogleAppsScript.HTML.HtmlOutput {
  return HtmlService.createTemplateFromFile("page")
    .evaluate()
    .setTitle("Drive画像をスプレッドシートに挿入");
}

const IMAGE_WIDTH = 300;

function insertDriveImagesToSpreadsheet(
  folderId: string,
  spreadsheetId: string,
): number {
  if (!folderId.trim() || !spreadsheetId.trim()) {
    throw new Error("フォルダIDとスプレッドシートIDを入力してください。");
  }

  const images = getDriveImages_(folderId);
  const sheet = SpreadsheetApp.openById(spreadsheetId).getSheets()[0];
  let nextRow = 1;

  // https://github.com/zakzakst/clasp-practice4/blob/main/src/insertImagesFromDrive.ts
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

  return images.length;
}
