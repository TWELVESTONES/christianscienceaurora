const modules = ["Dashboard", "Campaign Banner", "Events", "Sermons", "Articles", "Products & Orders", "Sunday School", "Static Pages", "Media Library", "Forms", "Giving", "External Resources", "SEO & Redirects", "Users", "Compliance"];

export function AdminPreview() {
  return (
    <div className="admin-grid">
      <aside className="admin-nav" aria-label="Admin modules">{modules.map((module) => <a key={module} href={`#${module.toLowerCase().replaceAll(" ", "-")}`}>{module}</a>)}</aside>
      <div>
        <div className="confirmation-note" style={{ marginTop: 0 }}><strong>Preview only:</strong> Connect production authentication, 2FA, audit logging, and CMS permissions before deployment.</div>
        <div className="admin-kpis" style={{ margin: "1.25rem 0" }}><div className="kpi"><span>Awaiting review</span><strong>12</strong></div><div className="kpi"><span>Scheduled</span><strong>3</strong></div><div className="kpi"><span>Expiring soon</span><strong>2</strong></div><div className="kpi"><span>Broken-link alerts</span><strong>0</strong></div></div>
        <div className="card-grid two">
          <article className="card"><div className="eyebrow">WORKFLOW</div><h3>Content awaiting permissions</h3><p>Sermon media placeholder · product cover placeholder · history archive photography.</p><span className="card-meta">Compliance Reviewer queue</span></article>
          <article className="card"><div className="eyebrow">CHURCH CONFIRMATION</div><h3>Unresolved launch fields</h3><p>Reading Room hours · parking · accessible entrance · domain email · remote attendance · giving provider.</p><span className="card-meta">Website Coordinator queue</span></article>
          <article className="card"><div className="eyebrow">EVENTS</div><h3>Automatic archive</h3><p>Campaign expiration, completed event handling, recurring services, and canceled/postponed status are enabled in the data model.</p></article>
          <article className="card"><div className="eyebrow">SECURITY</div><h3>Least-privilege roles</h3><p>Administrator, Website Coordinator, Events Editor, Sermon Editor, Reading Room Manager, Sunday School Editor, Compliance Reviewer, Contributor.</p></article>
        </div>
      </div>
    </div>
  );
}
