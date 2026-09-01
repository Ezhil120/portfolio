// Interactive Code Modernizer Tab Switcher (JSP vs React)
(function () {
  const codeBox = document.getElementById('code-modernizer-display');
  const codeTabs = document.querySelectorAll('.code-tab-btn');
  if (!codeBox) return;

  const codeSnippets = {
    react: `<span class="code-comment">// Modern React 18 Component (Modular & Testable)</span>
<span class="code-kw">import</span> React, { useState, useEffect, useMemo } <span class="code-kw">from</span> <span class="code-str">'react'</span>;
<span class="code-kw">import</span> { fetchClinicalRecords } <span class="code-kw">from</span> <span class="code-str">'../api/healthcare'</span>;

<span class="code-kw">export const</span> <span class="code-fn">PatientRegistry</span> = ({ wardId }) =&gt; {
  <span class="code-kw">const</span> [patients, setPatients] = <span class="code-fn">useState</span>([]);
  <span class="code-kw">const</span> [filter, setFilter] = <span class="code-fn">useState</span>(<span class="code-str">''</span>);

  <span class="code-fn">useEffect</span>(() =&gt; {
    <span class="code-fn">fetchClinicalRecords</span>(wardId).<span class="code-fn">then</span>(data =&gt; <span class="code-fn">setPatients</span>(data));
  }, [wardId]);

  <span class="code-kw">const</span> filteredList = <span class="code-fn">useMemo</span>(() =&gt; 
    patients.<span class="code-fn">filter</span>(p =&gt; p.name.<span class="code-fn">toLowerCase</span>().<span class="code-fn">includes</span>(filter.<span class="code-fn">toLowerCase</span>())),
    [patients, filter]
  );

  <span class="code-kw">return</span> (
    <span class="code-tag">&lt;div</span> <span class="code-fn">className</span>=<span class="code-str">"clinical-grid-container"</span> <span class="code-fn">data-testid</span>=<span class="code-str">"patient-grid"</span><span class="code-tag">&gt;</span>
      <span class="code-tag">&lt;SearchBar</span> <span class="code-fn">value</span>={filter} <span class="code-fn">onChange</span>={setFilter} <span class="code-tag">/&gt;</span>
      <span class="code-tag">&lt;DataTable</span> <span class="code-fn">data</span>={filteredList} <span class="code-fn">columns</span>={[<span class="code-str">'ID'</span>, <span class="code-str">'Name'</span>, <span class="code-str">'Triage'</span>, <span class="code-str">'Vitals'</span>]} <span class="code-tag">/&gt;</span>
    <span class="code-tag">&lt;/div&gt;</span>
  );
};`,
    jsp: `<span class="code-comment">&lt;%-- Legacy Monolithic JSP Screen (Tight coupling & page reloads) --%&gt;</span>
<span class="code-tag">&lt;%@ page</span> <span class="code-fn">import</span>=<span class="code-str">"java.util.*, com.hospital.dao.PatientDAO"</span> <span class="code-tag">%&gt;</span>
<span class="code-tag">&lt;%</span>
  String ward = request.getParameter(<span class="code-str">"wardId"</span>);
  List patients = PatientDAO.getPatientsByWard(ward);
<span class="code-tag">%&gt;</span>
<span class="code-tag">&lt;table</span> <span class="code-fn">id</span>=<span class="code-str">"legacyTable"</span> <span class="code-fn">border</span>=<span class="code-str">"1"</span> <span class="code-fn">cellpadding</span>=<span class="code-str">"4"</span><span class="code-tag">&gt;</span>
  <span class="code-tag">&lt;tr&gt;&lt;th&gt;</span>Patient ID<span class="code-tag">&lt;/th&gt;&lt;th&gt;</span>Full Name<span class="code-tag">&lt;/th&gt;&lt;th&gt;</span>Status<span class="code-tag">&lt;/th&gt;&lt;/tr&gt;</span>
<span class="code-tag">&lt;%</span>
  <span class="code-kw">for</span> (Iterator it = patients.iterator(); it.hasNext();) {
    Patient p = (Patient) it.next();
<span class="code-tag">%&gt;</span>
  <span class="code-tag">&lt;tr&gt;</span>
    <span class="code-tag">&lt;td&gt;</span><span class="code-tag">&lt;%=</span> p.getId() <span class="code-tag">%&gt;&lt;/td&gt;</span>
    <span class="code-tag">&lt;td&gt;</span><span class="code-tag">&lt;%=</span> p.getName() <span class="code-tag">%&gt;&lt;/td&gt;</span>
    <span class="code-tag">&lt;td&gt;&lt;font</span> <span class="code-fn">color</span>=<span class="code-str">"red"</span><span class="code-tag">&gt;&lt;%=</span> p.getStatus() <span class="code-tag">%&gt;&lt;/font&gt;&lt;/td&gt;</span>
  <span class="code-tag">&lt;/tr&gt;</span>
<span class="code-tag">&lt;% } %&gt;</span>
<span class="code-tag">&lt;/table&gt;</span>`
  };

  function updateCode(tab) {
    codeBox.innerHTML = `<pre>${codeSnippets[tab] || codeSnippets.react}</pre>`;
  }

  codeTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      codeTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.getAttribute('data-code');
      updateCode(target);
    });
  });

  updateCode('react');
})();
