import { google } from "googleapis";

function getAuth(credentials) {
  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
    // "http://localhost:3000/"
  );
  const { access_token } = credentials;
  auth.setCredentials({
    access_token,
    approval_prompt: "force",
    access_type: "offline",
  });
  return auth;
}

async function getCourses(credentials) {
  const auth = getAuth(credentials);
  const classroom = google.classroom({
    version: "v1",
    auth,
  });
  const response = await classroom.courses.list();
  const courses = response.data.courses;
  return courses;
}

async function fetchCourseRoster(credentials, courseId) {
  const auth = getAuth(credentials);
  const classroom = google.classroom({ version: "v1", auth });
  const response = await classroom.courses.students.list({
    courseId: courseId,
  });

  return response.data.students;
}

export { getCourses, fetchCourseRoster };
