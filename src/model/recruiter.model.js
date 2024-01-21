const recruiters = [
  { name: "test", email: "test@gmail.com", password: "1234" },
];

export default class RecruiterModel {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static getAll() {
    return recruiters;
  }

  static addNewRecruiter(recruiter) {
    const { name, email, password } = recruiter;
    const newRecruiter = new RecruiterModel(name, email, password);
    recruiters.push(newRecruiter);
  }

  static isValid(recruiter) {
    const { email, password } = recruiter;

    return recruiters.find((account) => account.email == email);
  }
}
