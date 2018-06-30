const labels = [
  { id: 'para-assistir', name: 'Para assistir'},
  { id: 'assistindo', name: 'Assistindo'},
  { id: 'assistido', name: 'Assistido'}
]

const pagination = async (model, conditions, params) => {
  const total = await model.count(conditions)
  const pageSize = parseInt(params.pageSize) || 5
  const currentPage = parseInt(params.page) || 0

  const pagination = {
    currentPage: currentPage,
    pageSize: pageSize,
    pages: parseInt(total/pageSize)
  }

  const results = await model
                        .find(conditions)
                        .skip(currentPage*pageSize)
                        .limit(pageSize)

  return {
    data: results,
    pagination
  }
}

const index = async ({ Serie }, req, res) => {
  const results = await pagination(Serie,{}, req.query)
  res.render('series/index',{ results, labels}) 
}

const novaProcess = async ({ Serie }, req, res) => {
  const serie = new Serie(req.body)
  try {
    await serie.save() 
    res.redirect('/series')
  } catch (e) {
    res.render('series/nova',{
      errors: Object.keys(e.errors)
    })
  }
  
}

const novaForm = (req,res) => {
  res.render('series/nova',{ errors:[]})
}

const excluir = async ({ Serie }, req, res) => {
  await Serie.remove({ _id: req.params.id })
  res.redirect('back')
}

const editarProcess = async ({ Serie }, req, res) => {
  const serie = await Serie.findOne({ _id: req.params.id })
  serie.name = req.body.name
  serie.status = req.body.status
  try {
    await serie.save()
    res.redirect('/series')
  } catch (e) {
    res.render('series/editar',{ serie, labels,  errors: Object.keys(e.errors)})
  }
}

const editarForm = async ({ Serie }, req, res) => {
  const serie = await Serie.findOne({ _id: req.params.id })
  res.render('series/editar',{ serie, labels, errors:[] })
}

const info = async ({ Serie }, req, res) => {
  const serie = await Serie.findOne({ _id: req.params.id })
  res.render('series/info', { serie })
}

const addComentario = async ({ Serie }, req, res) => {
  const serie = await Serie.updateOne({ _id: req.params.id }, {$push: { comments: req.body.comentario }})
  res.redirect('/series/info/'+req.params.id)
}

module.exports = { index, novaForm, novaProcess, excluir, editarForm, editarProcess, addComentario, info }