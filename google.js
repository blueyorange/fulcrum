import { google } from "googleapis";

function getAuth(access_token) {
  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
    // "http://localhost:3000/"
  );
  auth.setCredentials({
    access_token,
  });
  return auth;
}

async function getCourses(accessToken) {
  const auth = getAuth(accessToken);
  const classroom = google.classroom({
    version: "v1",
    auth,
  });
  const response = await classroom.courses.list();
  return response.data.courses;
}

async function fetchClassRoster(accessToken, courseId) {
  const auth = getAuth(accessToken);
  const classroom = google.classroom({ version: "v1", auth });
  const response = await classroom.courses.students.list({
    courseId: courseId,
  });
  return response.data.students;
}

export { getCourses, fetchClassRoster };
