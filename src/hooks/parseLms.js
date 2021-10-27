import {CLASS_TYPE, DAY, D_DAY} from "../common";
import {parseDate} from "./parseDate";

export const parseLmsToArr = (lms) => {
  const now = Date.now();
  const tmpLms = [];

  for (let c of lms) {
    const cname = c.name.includes("_") ? c.name.split("_")[1] : c.name;
    const tmpClass = [];

    for (let section of c.sections) {
      const sname1 = section.name.split(" ")[0];
      const tmpSection = [];

      for (let subsection of section.subsections) {
        const sname2 = parseInt(subsection.name.split(" ")[0]);
        const tmpSubsection = [];

        for (let unit of subsection.units) {
          for (let component of unit.components) {
            let due = ["-"];
            if (component.due_at !== null) {
              const date = new Date(component.due_at);
              const diff = (date - now) / DAY;
              if (diff <= 0) due = ["-"];
              if (diff <= 2) due = [D_DAY[Math.floor(diff)]];
              else if (diff <= 7) due = [`D-${Math.floor(diff)}`];
              else
                due = [
                  parseDate(date),
                  `${date.getHours()}:${date.getMinutes()}`,
                ];
            } else due = ["-"];
            if (component.completed) due = ["완료"];

            tmpSubsection.push({
              type: CLASS_TYPE[component.type] || component.type,
              // cid: c.id,
              // cname: cname,
              title: component.title,
              due: due,
              due_date: component.due_at || "-",
              component_id: component.id,
              link: `https://learning.hanyang.ac.kr/courses/${c.id}/assignments/${component.id}`,
            });
          }
        }
        if (tmpSubsection.length > 0)
          tmpSection.push({subsection: sname2, class: tmpSubsection});
      }
      if (tmpSection.length > 0)
        tmpClass.push({section: sname1, class: tmpSection});
    }
    tmpLms.push({name: cname, class: tmpClass});
  }

  return tmpLms;
};

export const parseAbsentLms = (lms) => {
  const now = new Date();
  const tmpAbsent = [];

  for (let c of lms) {
    const cname = c.name.includes("_") ? c.name.split("_")[1] : c.name;
    for (let section of c.sections) {
      const sname1 = section.name.split(" ")[0];
      for (let subsection of section.subsections) {
        const sname2 = parseInt(subsection.name.split(" ")[0]);
        for (let unit of subsection.units) {
          for (let component of unit.components) {
            let due = ["-"];
            if (component.due_at !== null) {
              const date = new Date(component.due_at);
              const diff = (date - now) / DAY;
              if (diff <= 2) due = [D_DAY[Math.floor(diff)]];
              else if (diff <= 7) due = [`D-${Math.floor(diff)}`];
              else
                due = [
                  parseDate(date),
                  `${date.getHours()}:${date.getMinutes()}`,
                ];
            }
            if (!component.completed) {
              tmpAbsent.push({
                type: CLASS_TYPE[component.type] || component.type,
                cid: c.id,
                cname: cname,
                sname: `${sname1} ${sname2}`,
                title: component.title,
                due: due,
                due_date: component.due_at,
                component_id: component.id,
                link: `https://learning.hanyang.ac.kr/courses/${c.id}/assignments/${component.id}`,
              });
            }
          }
        }
      }
    }
  }

  return tmpAbsent;
};

export const sortDueDate = (a, b) => {
  if (a.due[0] === "-") return 1;
  else if (b.due[0] === "-") return -1;

  if (a.due.length === 1 && b.due.length === 1)
    return a.due[0].substring(2) - b.due[0].substring(2);
  else if (a.due.length === 1) return -1;
  else if (b.due.length === 1) return 1;

  if (a.due[0] === b.due[0]) return a.due[1] < b.due[1] ? -1 : 1;
  else return a.due[0] < b.due[0] ? -1 : 1;
};

export const sortClass = (a, b) => {
  if (a.cname === b.cname) return sortDueDate(a, b);
  else return a.cname < b.cname ? -1 : 1;
};
