import moment from "moment";
import { Document } from "swr-firestore-v9";

import { Users } from "../@types/interfaces";

export const randomDate = (start: Date) => {
  const end = new Date();
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

export const userByWeek = (users: Document<Users>[]) => {
  const thisWeek = {
    start: moment().startOf("week"),
    end: moment().endOf("week"),
  };
  const lastWeek = {
    start: moment().startOf("week").subtract(7, "days"),
    end: moment().endOf("week").subtract(7, "days"),
  };

  let userThisWeek = 0;
  let userLastWeek = 0;

  users.forEach((user) => {
    if (user.createdAt) {
      if (moment(user.createdAt).isBetween(thisWeek.start, thisWeek.end)) {
        userThisWeek++;
      }
      if (moment(user.createdAt).isBetween(lastWeek.start, lastWeek.end)) {
        userLastWeek++;
      }
    }
  });

  return { userThisWeek, userLastWeek };
};
