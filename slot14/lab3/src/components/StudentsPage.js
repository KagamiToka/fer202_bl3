import React, { useState, useMemo } from "react";
import { students } from "../students";
import StudentCard from "./StudentCard";
import StudentDetailModal from "./StudentDetailModal";
import { Row, Col } from "react-bootstrap";
import Hero from "./Hero";
import Footer from "./Footer";
import Navbar  from "./Navbar";
import ProfileWizard from "./profile/ProfileWizard";

function StudentsPage() {
  const [search, setSearch] = useState("");
  const [ageFilter, setAgeFilter] = useState("");
  const [hasAvatar, setHasAvatar] = useState(false);
  const [sort, setSort] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showWizard, setShowWizard] = useState(false);

  const filteredStudents = useMemo(() => {
    let data = [...students];

    if (search) {
      data = data.filter(
        (s) =>
          s.name.toLowerCase().includes(search.toLowerCase()) ||
          s.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (ageFilter === "≤20") data = data.filter((s) => s.age <= 20);
    if (ageFilter === "21–25") data = data.filter((s) => s.age >= 21 && s.age <= 25);
    if (ageFilter === ">25") data = data.filter((s) => s.age > 25);

    if (hasAvatar) data = data.filter((s) => s.avatar);

    if (sort === "ageAsc") data.sort((a, b) => a.age - b.age);
    if (sort === "ageDesc") data.sort((a, b) => b.age - a.age);
    if (sort === "nameAsc") data.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "nameDesc") data.sort((a, b) => b.name.localeCompare(a.name));

    return data;
  }, [search, ageFilter, hasAvatar, sort]);

  const handleView = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  return (
    <>
    <Navbar onOpenWizard={() => setShowWizard(true)}/>
      <Hero />

      <div className="container py-3">
        {/* Filters */}
        <div className="d-flex gap-3 mb-3 flex-wrap">
          <input
            type="text"
            placeholder="Search by name/email"
            className="form-control"
            style={{ maxWidth: "250px" }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="form-select"
            style={{ maxWidth: "150px" }}
            onChange={(e) => setAgeFilter(e.target.value)}
          >
            <option value="">All ages</option>
            <option value="≤20">≤20</option>
            <option value="21–25">21–25</option>
            <option value=">25"> Above 25</option>
          </select>
          <div className="form-check align-self-center">
            <input
              type="checkbox"
              className="form-check-input"
              checked={hasAvatar}
              onChange={(e) => setHasAvatar(e.target.checked)}
            />
            <label className="form-check-label">Has Avatar</label>
          </div>
          <select
            className="form-select"
            style={{ maxWidth: "150px" }}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort</option>
            <option value="ageAsc">Age ↑</option>
            <option value="ageDesc">Age ↓</option>
            <option value="nameAsc">Name A→Z</option>
            <option value="nameDesc">Name Z→A</option>
          </select>
        </div>

        {/* Student Grid */}
        <Row xs={1} md={2} lg={3} className="g-3">
          {filteredStudents.map((s) => (
            <Col key={s.id}>
              <StudentCard student={s} onView={handleView} />
            </Col>
          ))}
        </Row>
      </div>

      {/* Modal */}
      <StudentDetailModal
        student={selectedStudent}
        show={showModal}
        onClose={() => setShowModal(false)}
      />
      {/* Profile Wizard */}
      <ProfileWizard show={showWizard} onClose={() => setShowWizard(false)} />
      <Footer />
    </>
  );
}

export default StudentsPage;
