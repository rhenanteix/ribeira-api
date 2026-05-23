export function buildContext(
  events: any[]
) {

  return events.map(event => `
Evento:
${event.title}

Descrição:
${event.description}

Data:
${event.start_date}
  `).join("\n");

}