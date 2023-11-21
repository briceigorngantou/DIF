export default function docs() {
    const appUrl = process.env.APP_URL
    return (
        <div>

            <hr />
            <main style={{ padding: '6rem' }}>
                <section>
                    <header style={{ fontWeight: 'bold' }}>
                        Section De L&#39;administrateur
                    </header>
                    <ul style={{ padding: 15 }}>
                        <li style={{ listStyle: 'outside', margin: 10 }}>
                            S&#39;enregistrer: <a style={{ textDecoration: 'underline' }} href={`${appUrl}admin/login`}>{appUrl}admin/login</a>
                        </li>
                        <li style={{ listStyle: 'outside', margin: 10 }}>
                            Liste Des Entreprise: <a style={{ textDecoration: 'underline' }}  href={`${appUrl}admin`}>{appUrl}admin</a>
                        </li>
                        <li style={{ listStyle: 'outside', margin: 10 }}>
                            Statistic des participant: <a style={{ textDecoration: 'underline' }} href={`${appUrl}admin/statistics`}>{appUrl}admin/statistics</a>
                        </li>
                        <li style={{ listStyle: 'outside', margin: 10 }}>
                            Liste de Toute les Demande des Contacts: <a style={{ textDecoration: 'underline' }} href={`${appUrl}admin/visitors`}>{appUrl}admin/visitors</a>
                        </li>
                        <li style={{ listStyle: 'outside', margin: 10 }}>
                            Liste des Participant: <a style={{ textDecoration: 'underline' }} href={`${appUrl}admin/participants`}>{appUrl}admin/participants</a>
                        </li>
                    </ul>
                </section>

                <section>
                    <header style={{ fontWeight: 'bold' }}>
                        Section De L&#39;entreprise (l&#39;entreprise doit exister).
                    </header>
                    <ul style={{ padding: 15 }}>
                        <li style={{ listStyle: 'outside', margin: 10 }}>
                            S&#39;enregistrer: <a style={{ textDecoration: 'underline' }} href={`${appUrl}company/uuid`}>{appUrl}company/uuid</a>
                        </li>

                        <li style={{ listStyle: 'outside', margin: 10 }}>
                            Scan Qrcode: <a style={{ textDecoration: 'underline' }} href={`${appUrl}company/uuid/qrcode`}>{appUrl}company/uuid/qrcode</a>
                        </li>
                    </ul>
                </section>

                <section>
                    <header style={{ fontWeight: 'bold' }}>
                        Section De L&#39;utilisateur.
                    </header>
                    <ul style={{ padding: 15 }}>
                        <li style={{ listStyle: 'outside', margin: 10 }}>
                            S&#39;enregistrer: <a style={{ textDecoration: 'underline' }} href={`${appUrl}user/register`}>{appUrl}user/register</a>
                        </li>

                        <li style={{ listStyle: 'outside', margin: 10 }}>
                            Ticket: <a style={{ textDecoration: 'underline' }} href={`${appUrl}user/ticket/ticket_uuid`}>{appUrl}user/ticket/uuid</a> (L&#39;utilisateur doit exister.)
                        </li>
                    </ul>
                </section>

                <section>
                    <header style={{ fontWeight: 'bold' }}>
                        Section Publique.
                    </header>
                    <ul style={{ padding: 15 }}>
                        <li style={{ listStyle: 'outside', margin: 10 }}>
                            Liste des Entreprise: <a style={{ textDecoration: 'underline' }} href={`${appUrl}`}>{appUrl}</a>
                        </li>
                    </ul>
                </section>
            </main>
        </div>

    )
}
