export const JobsComponent = {
  init() {
    this.$jobs = document.getElementById('jobs');
    this.$loader = document.getElementById('jobs-loader');

    if (this.$jobs) {
      const JOBS_URL = this.$jobs.getAttribute('data-url');
      this._getJobs(JOBS_URL);
    }
  },

  _getJobs(url) {
    fetch(url)
      .then(data => data.json())
      .then(jobs => this._addJobs(jobs));
  },

  _addJobs(jobs) {
    if (jobs) {
      this.$loader.remove();
      return jobs
        .sort(this._compareDates)
        .forEach(job => this._addJob(job));
    } else {
      this.$jobs.innerHTML = '<h4>No hay ofertas de trabajo disponibles</h4>';
    }
  },

  _compareDates(a, b) {
    if (a.createdAt < b.createdAt) {
      return 1;
    }
    if (a.createdAt > b.createdAt) {
      return -1;
    }
    return 0;
  },

  _addJob(job) {
    const $job = document.createElement('article');
    $job.innerHTML = `
        <a title="Link a la oferta original" href="${job.link}" target="_blank"> ${job.description} </a>
        <div class="info">
          <div title="Fecha de publicación"> ${new Date(job.createdAt).toLocaleDateString()} </div>
          <div title="Puntuación de la oferta" class="score">
            <span>${job.votes.upvotes} 👍</span> <span>${job.votes.downvotes} 👎</span>
          </div>
        </div>
    `;

    return this.$jobs.appendChild($job);
  },
};
