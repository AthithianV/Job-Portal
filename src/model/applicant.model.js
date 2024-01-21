export default class ApplicantModel {
  constructor(id, name, email, contact, resumeUrl) {
    this.jobID = id;
    this.id = applicants.length + 1;
    this.name = name;
    this.email = email;
    this.contact = contact;
    this.resumeUrl = resumeUrl;
  }

  static addApplicant(id, name, email, contact, resumeUrl) {
    const newApplicant = new ApplicantModel(
      id,
      name,
      email,
      contact,
      resumeUrl
    );
    applicants.push(newApplicant);
  }

  static getApplicantsDetails(applicantsMails) {
    const set = new Set(applicantsMails);
    return applicants.filter((applicant) => set.has(applicant.email));
  }
}

const applicants = [];
