import fs from "fs";

export function storeUserData(
  outputPath: string,
  name: string,
  email: string,
  passwort: string
) {
  const currentData = fs.readFileSync(outputPath, "utf-8");
  const newData = JSON.parse(currentData);
  const newUser = { name: name, email: email, passwort: passwort };
  newData["user"].push(newUser);
  const updateData = JSON.stringify(newData);
  fs.writeFileSync(outputPath, updateData);
}
