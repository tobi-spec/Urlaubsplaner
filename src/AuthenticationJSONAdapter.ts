import fs from "fs";

export function createUser(
  outputPath: string,
  name: string,
  email: string,
  passwort: string
) {
  const currentData = fs.readFileSync(outputPath, "utf-8");
  const data = JSON.parse(currentData);

  const newUser = {
    user: name,
    credentials: { email: email, passwort: passwort },
    vaccation: []
  };

  data["employees"].push(newUser);
  const updateData = JSON.stringify(data);
  fs.writeFileSync(outputPath, updateData);
}
