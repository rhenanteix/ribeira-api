interface BuildContextInput {
  events?: any[];
  places?: any[];
}

export function buildContext({
  events = [],
  places = []
}: BuildContextInput) {

  let context = "";

  if (events.length) {

    context += `
EVENTOS:

`;

    for (const event of events) {
      context += `
Título: ${event.title}
Descrição: ${event.description}
Cidade: ${event.city}
Data: ${event.start_date}

`;
    }
  }

  if (places.length) {

    context += `
LUGARES:

`;

    for (const place of places) {
      context += `
Nome: ${place.name}
Descrição: ${place.description}
Cidade: ${place.city}

`;
    }

  }

  return context;
}