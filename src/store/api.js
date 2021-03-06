import shortid from "shortid";
import { app } from "electron";
import {showDialog} from "@/background";

const fs = require("fs");
const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const dir = `${app.getPath("documents")}/navfit2020`;

fs.mkdir(dir, { recursive: true }, error => {
  if (error) showDialog("error", "Create Directory Error", "Error creating navfit directory, file a bug please!", null, error);
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
      await db.get("sailors")
        .remove({ uuid: payload })
        .write();
      return db.get("sailors")
        .value();
    } catch (error) {
      return { error };
    }
  },
  async addRecord(payload) {
    try {
      const uuid = shortid.generate();
      db.get("sailors")
        .find({ uuid: payload.uuid })
        .get("records")
        .push({ id: uuid, ...payload.form })
        .write();
      return { uuid: payload.uuid, id: uuid };
    } catch (error) {
      return { error };
    }
  },
  async getRecord(payload) {
    return db.get("sailors")
      .find({ uuid: payload.uuid })
      .get("records")
      .find({ id: payload.id })
      .value();
  },
  async updateRecord({ uuid, form }) {
    try {
      return db.get("sailors")
        .find({ uuid })
        .get("records")
        .find({ id: form.id })
        .assign(form)
        .write();
    } catch (error) {
      return { error };
    }
  },
  async deleteRecord(payload) {
    try {
      return db.get("sailors")
        .find({ uuid: payload.uuid })
        .get("records")
        .remove({ id: payload.recordid })
        .write();
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
