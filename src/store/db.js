import lowdb from "lowdb";
import shortid from "shortid";

const FileSync = window.require("lowdb/adapters/FileSync");

const adapter = new FileSync("data.json", {
  defaultValue: {}
});

const db = lowdb(adapter);

export default {
  async readDatabase() {
    return db.getState();
  },
  async readSailors() {
    return db.get("sailors");
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
    try {
      db.get("sailors")
        .find(payload.uuid)
        .update(payload)
        .write();
      return { uuid: payload.uuid };
    } catch (error) {
      return { error };
    }
  },
  async deleteSailor(payload) {
    try {
      return db.get("sailors")
        .remove({ uuid: payload })
        .write();
    } catch (error) {
      return { error };
    }
  },
  async addRecord(payload) {
    try {
      db.get("sailors")
        .find({ uuid: payload.uuid })
        .get("records")
        .push({ id: shortid.generate(), ...payload.form })
        .write();
      return true;
    } catch (error) {
      return { error };
    }
  },
  async updateRecord(payload) {
    try {
      db.get("sailors")
        .find({ uuid: payload.uuid })
        .get("records")
        .assign(payload.form)
        .write();
      return true;
    } catch (error) {
      return { error };
    }
  },
  async saveCommandDefaults(payload) {
    try {
      if (!db.has("commandInfo").value()) {
        db.set("commandInfo", {})
          .write();
      }
      return db.get("commandInfo")
        .assign(payload)
        .write();
    } catch (error) {
      return { error };
    }
  },
};
