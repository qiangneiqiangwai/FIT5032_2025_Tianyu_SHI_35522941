<script setup></script>

<template>
  <div class="my-name-container">
    <h2 class="name-title">My Name</h2>
    <div class="name-display">
      <p class="student-name">Tianyu SHI</p>
      <p class="student-id">Student ID: 35522941</p>
      <p class="course-info">week1 task</p>
    </div>
  </div>
</template>

<style scoped>
.my-name-container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
  padding: 2rem;
  margin: 1.5rem 0;
  color: white;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.name-title {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #ffffff;
}

.name-display {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
}

.student-name {
  font-size: 2rem;
  font-weight: bold;
  margin: 0.5rem 0;
  color: #ffd700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.student-id {
  font-size: 1.1rem;
  margin: 0.5rem 0;
  color: #e0e0e0;
}

.course-info {
  font-size: 1rem;
  margin: 0.5rem 0;
  color: #c0c0c0;
  font-style: italic;
}

@media (max-width: 768px) {
  .my-name-container {
    padding: 1.5rem;
    margin: 1rem 0;
  }

  .student-name {
    font-size: 1.5rem;
  }

  .name-title {
    font-size: 1.5rem;
  }
}
</style>
