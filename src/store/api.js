import shortid from "shortid";
import { app } from "electron";

const fs = require("fs");
const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const dir = `${app.getPath("documents")}/navfit2020`;

fs.mkdir(dir, { recursive: true }, err => {
  if (err) {
    console.log(err);
  } else {
    console.log("New directory successfully created.");
  }
});

const databasePath = `${dir}/navfit2020data.json`;

const adapter = new FileSync(databasePath, {
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
      await db.set("sailors", [])
        .write();
    }
    try {
      const uuid = shortid.generate();
      await db.get("sailors")
        .push({ ...form, uuid, records: [] })
        .write();
      return { uuid };
    } catch (error) {
      return { error };
    }
  },
  async getSailor(payload) {
    return db.get("sailors")
      .find({ uuid: payload.uuid })
      .value();
  },
  async updateSailor(payload) {
    try {
      await db.get("sailors")
        .find({ uuid: payload.uuid })
        .assign(payload)
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
  async updateRecord({ uuid, form }) {
    try {
      await db.get("sailors")
        .find({ uuid })
        .get("records")
        .find({ id: form.id })
        .assign(form)
        .write();
      return true;
    } catch (error) {
      return { error };
    }
  },
  async saveCommandDefaults(form) {
    if (!db.has("commandInfo").value()) {
      db.set("commandInfo", {})
        .write();
    }
    try {
      return db.get("commandInfo")
        .assign(form)
        .write();
    } catch (error) {
      return { error };
    }
  },
};
