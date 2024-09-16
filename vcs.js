#!/usr/bin/env node
import add from "./add.js";
import commit from "./commit.js";
import history from "./history.js";
import init from "./init.js";
// Handle CLI commands
const command = process.argv[2];
if (command === "init") init();
if (command === "add") add(process.argv[3]);
if (command === "commit") commit(process.argv[3] || "No commit message");
if (command === "history") history();
