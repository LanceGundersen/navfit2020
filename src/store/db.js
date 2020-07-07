import lowdb from "lowdb";
import shortid from "shortid";
import FileSync from "lowdb/adapters/FileSync";

const adapter = new FileSync("data.json", {
  defaultValue: {}
});

const db = lowdb(adapter);

export default {
  async readDatabase() {
    return db.getState();
  },
  async addSailor(form) {
    if (!db.has("sailors").value()) {
      db.set("sailors", [])
        .write();
    }
    try {
      const uuid = shortid.generate();
      db.get("sailors")
        .push({ ...form, uuid, records: [] })
        .write();
      return { uuid };
    } catch (error) {
      return { error };
    }
  },
  async updateSailor(payload) {
    const { uuid } = payload;
    try {
      db.get("sailors")
        .find(uuid)
        .update(payload)
        .write();
      return { uuid };
    } catch (error) {
      return { error };
    }
  },
  async deleteSailor(payload) {
    return db.get("sailors")
      .remove({ uuid: payload })
      .write();
  },
  async addRecord({ uuid, form }) {
    try {
      db.get("sailors")
        .find({ uuid })
        .get("records")
        .push({ id: shortid.generate(), ...form })
        .write();
      return { uuid };
    } catch (error) {
      return { error };
    }
  },
  async saveCommandDefaults(payload) {
    if (!db.has("commandInfo").value()) {
      db.set("commandInfo", {})
        .write();
    }
    return db.get("commandInfo")
      .assign(payload)
      .write();
  },
};
