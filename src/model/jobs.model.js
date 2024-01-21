export default class JobsModel {
  constructor(
    id,
    category,
    companyName,
    designation,
    location,
    salary,
    deadline,
    openings,
    applicantsCount,
    skills,
    postedBy
  ) {
    this.id = id;
    this.category = category;
    this.companyName = companyName;
    this.designation = designation;
    this.location = location;
    this.salary = salary;
    this.deadline = deadline.toLocaleString();
    this.openings = openings;
    this.applicantsCount = 0;
    this.skills = this.initiateSkills(skills);
    this.postedOn = new Date().toDateString();
    this.applicants = [];
    this.postedBy = postedBy;
  }

  initiateSkills(skills) {
    if (skills instanceof Array) {
      return new Set(skills);
    } else {
      const set = new Set();
      set.add(skills);
      return set;
    }
  }

  static getAll() {
    return jobs;
  }

  static createJob(newJob) {
    const {
      id,
      category,
      companyName,
      designation,
      location,
      salary,
      deadline,
      openings,
      applicantsCount,
      skills,
      postedBy,
    } = newJob;
    const job = new JobsModel(
      id,
      category,
      companyName,
      designation,
      location,
      salary,
      deadline,
      openings,
      applicantsCount,
      skills,
      postedBy
    );
    return job;
  }

  static replaceJob(updatedJob) {
    const index = jobs.findIndex((job) => updatedJob.id == job.id);
    jobs[index] = updatedJob;
  }

  static addJob(newJob) {
    const {
      category,
      companyName,
      designation,
      location,
      salary,
      deadline,
      openings,
      applicantsCount,
      skills,
    } = newJob;
    const job = new JobsModel(
      jobs.length + 1,
      category,
      companyName,
      designation,
      location,
      salary,
      deadline,
      openings,
      applicantsCount,
      skills
    );
    jobs.push(job);
  }

  static getJobByID(id) {
    return jobs.find((job) => job.id == id);
  }

  static deleteJob(id) {
    const index = jobs.findIndex((job) => id == job.id);
    if (index == -1) {
      return false;
    }
    jobs.splice(index, 1);
    return true;
  }

  static addApplicant(id, email) {
    console.log(id);
    const index = jobs.findIndex((job) => id == job.id);
    jobs[index].applicantsCount = jobs[index].applicantsCount + 1;
    jobs[index].applicants.push(email);
  }

  static getApplicants(id) {
    const job = jobs.find((job) => job.id == id);
    return job.applicants;
  }

  static getMatches(keyword) {
    return jobs.filter(
      (job) =>
        keyword == job.category ||
        keyword == job.companyName ||
        keyword == job.designation ||
        keyword == job.location ||
        keyword == job.salary ||
        job.skills.has(keyword)
    );
  }
}

const jobs = [
  {
    id: 1,
    category: "Tech",
    companyName: "Coding Ninjas",
    designation: "SDE",
    location: "Gurgaon",
    salary: "12-14LPA",
    deadline: "30 Jan 2024",
    openings: 5,
    applicantsCount: 0,
    skills: new Set(["React", "NodeJs", "SQL"]),
    postedOn: new Date().toDateString(),
    applicants: [],
    postedBy: "test@gmail.com",
  },
  {
    id: 2,
    category: "Tech",
    companyName: "ECHO INDIA",
    designation: "Front-end Developer",
    location: "Delhi",
    salary: "5LPA",
    deadline: "30 Jan 2024",
    openings: 5,
    applicantsCount: 0,
    skills: new Set(["React"]),
    postedOn: new Date().toDateString(),
    applicants: [],
    postedBy: "test@gmail.com",
  },
  {
    id: 3,
    category: "Tech",
    companyName: "Vipas.AI",
    designation: "Backend Developer",
    location: "Hyderabad",
    salary: "5LPA",
    deadline: "30 Jan 2024",
    openings: 5,
    applicantsCount: 0,
    skills: new Set(["NodeJs", "Express"]),
    postedOn: new Date().toDateString(),
    applicants: [],
    postedBy: "test@gmail.com",
  },
  {
    id: 4,
    category: "Tech",
    companyName: "Codemonk",
    designation: "Java Developer",
    location: "Bangalore",
    salary: "9-11LPA",
    deadline: "30 Jan 2024",
    openings: 5,
    applicantsCount: 0,
    skills: new Set(["React", "NodeJs"]),
    postedOn: new Date().toDateString(),
    applicants: [],
    postedBy: "test@gmail.com",
  },
];
