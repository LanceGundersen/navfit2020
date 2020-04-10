import lowdb from "lowdb";
import shortid from "shortid";
import FileSync from "lowdb/adapters/FileSync";
import INITIAL_STATE from "./state";

const adapter = new FileSync("data.json", {
  defaultValue: INITIAL_STATE
});

const db = lowdb(adapter);

export default {
  readDatabase() {
    return db.getState();
  },
  async addSailor(payload) {
    return db.get("sailors")
      .push({ uuid: shortid.generate(), ...payload, records: [] })
      .write();
  },
  async updateSailor({ uuid, form }) {
    return db.get("sailors")
      .find({ uuid })
      .update(form)
      .write();
  },
  deleteSailor(payload) {
    db.get("sailors")
      .remove({ uuid: payload })
      .write();
  },
  addRecord({ uuid, form }) {
    db.get("sailors")
      .find({ uuid })
      .get("records")
      .push({ id: shortid.generate(), ...form })
      .write();
  },
  async saveCommandDefaults(payload) {
    return db.get("commandInfo")
      .assign(payload)
      .write();
  },
};
