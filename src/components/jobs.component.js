const JOBS_URL = 'https://sauce-jobs-staging.herokuapp.com/jobs';

export const JobsComponent = {
  init() {
    this.$jobs = document.getElementById('jobs');

    if (this.$jobs) {
      this._getJobs();
    }
  },

  _getJobs () {
    fetch(JOBS_URL)
      .then(data => data.json())
      .then(jobs => this._addJobs(jobs));
  },

  _addJobs (jobs) {
    return jobs
      .sort((a, b) => a.createdAt <= b.createdAt)
      .forEach(job => this._addJob(job));
  },

  _addJob (job) {
    const $job = document.createElement('article');

    $job.innerHTML = `
      <div class="info">
        <a title="Link a la oferta original" href="${job.link}" > ${job.description} </a>
        <div title="Fecha de publicación"> ${new Date(job.createdAt).toLocaleDateString()} </div>
      </div>
      <div title="Puntuación de la oferta" class="score">
        ${job.votes.upvotes - job.votes.downvotes}
      </div>
    `;

    return this.$jobs.appendChild($job);
  }
};
