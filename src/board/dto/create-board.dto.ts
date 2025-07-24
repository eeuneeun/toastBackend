export class CreateBoardDto {
  /* `articleId` in the `CreateBoardDto` class is a property that represents the unique identifier of
  the article associated with the board. It is a string type, indicating that it stores the ID of
  the article to which the board belongs. */
  uid: string;

  articleId: string;

  title: string;

  contents: string;

  writeTime: string;

  like: string;
}
