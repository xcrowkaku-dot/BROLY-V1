"use strict";

const BAR = "━━━━━━━━━━━━━━━━━━━━";

function header(title = "🤖 KAKO BOT") {
  return `┌── ${title}\n${BAR}`;
}

function row(label, value, icon = "▪️") {
  return `${icon} ${label}: ${value}`;
}

function ok(message) {
  return `✅ ${message}`;
}

function err(message) {
  return `❌ ${message}`;
}

function wrn(message) {
  return `⚠️ ${message}`;
}

function inf(message) {
  return `ℹ️ ${message}`;
}

function divider() {
  return BAR;
}

module.exports = { header, row, ok, err, wrn, inf, divider };