import { Intro } from "../db/models/Intro";

class introSerivce {
  /* ---CREATE----  */
  static async createIntros(newInput) {
    const creatednewIntro = await Intro.create(newInput);
    return creatednewIntro;
  }

  /* -- UPDATE --*/
  static async updateIntro(obj_id, newInput) {
    let intro; //to assigned result and return
    const { user_id, text } = newInput;

    //text
    if (text) {
      const fieldToUpdate = "text";
      const newValue = title;
      intro = await Intro.update({ obj_id, fieldToUpdate, newValue });
    }
    return intro;
  }
  /* -- GET -- */
  /*-- DELETE --*/
}

export { introSerivce };
