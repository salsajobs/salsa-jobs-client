const JOBS_URL = 'https://sauce-jobs-staging.herokuapp.com/jobs';

export const JobsComponent = {
  init() {
    this.$jobs = document.getElementById('jobs');
    this.$loader = document.getElementById('jobs-loader');

    if (this.$jobs) {
      this._getJobs();
    }
  },

  _getJobs() {
    fetch(JOBS_URL)
      .then(data => data.json())
      .then(jobs => this._addJobs(jobs));
  },

  _addJobs(jobs) {
    if (jobs) {
      this.$loader.remove();
      return jobs
        .sort((a, b) => a.createdAt <= b.createdAt)
        .forEach(job => this._addJob(job));
    } else {
      this.$jobs.innerHTML = '<h4>No hay ofertas de trabajo disponibles</h4>';
    }
  },

  _addJob(job) {
    const $job = document.createElement('article');
    $job.innerHTML = `
        <a title="Link a la oferta original" href="${job.link}" > ${job.description} </a>  
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
