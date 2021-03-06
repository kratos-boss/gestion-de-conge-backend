const Division = require("../schema/models/division")
const Agent = require("../schema/models/agent")
const Conge = require("../schema/models/conge")
const typeAbsence = require("../schema/models/typeAbsence")

const transform = async (division) =>{
   
        let agentsTab  = []

        if(division.agents.length > 0){
            agentsTab = division.agents.map( async agentId => {
                try {
                    const ag = await Agent.findById(agentId);
                    if(!ag)
                        throw new Error("impossible de trouver un agent ");
                    console.log("trouver un agent nommer: " + ag.nom );
                    return {
                            ...ag._doc, 
                            Id: ag._doc._id , 
                            createdAt: new Date(ag._doc.createdAt).toDateString(),
                            updatedAt: new Date(ag._doc.updatedAt).toDateString()
                        }
                } catch (error) {
                    return console.log(error.message );
                }
                
            })            
        }
        return {
            ...division._doc,
            Id: division._doc._id,
            agents: agentsTab,
            createdAt: new Date(division._doc.createdAt).toDateString(),
            updatedAt: new Date(division._doc.updatedAt).toDateString()
        }
        
}

// fonction to transform status
const statusTransform = status =>{
    let agentsTab  = []

    if(status.agents){
        agentsTab = status.agents.map(async agentId => {
            const ag = await Agent.findById(agentId)
            
                return {
                    ...ag._doc, 
                    Id: ag._doc._id , 
                    createdAt: new Date(ag._doc.createdAt).toDateString(),
                    updatedAt: new Date(ag._doc.updatedAt).toDateString()
                } })            
    }

    return {
        ...status._doc,
        Id: status._doc._id,
        agents: agentsTab,
        createdAt: new Date(status._doc.createdAt).toDateString(),
        updatedAt: new Date(status._doc.updatedAt).toDateString()
    }
}

// fonction to transform typeconge
const typeCongeTransform = typeConge =>{
    let congeTab = [];
    if(typeConge._doc.conges){
        congeTab = typeConge._doc.conges.map( async congeId => {
           try{
            const cong = await Conge.findById(congeId);
            return {
                ...cong._doc,
                Id: cong._doc._id,
                createdAt: new Date(cong._doc.createdAt).toDateString(),
                updatedAt: new Date(cong._doc.updatedAt).toDateString()
            }
           }catch(err){
               throw err
           }
        } )
        
    }
    return {
        ...typeConge._doc,
        conges: congeTab,
        Id: typeConge._doc._id,
        createdAt: new Date(typeConge._doc.createdAt).toDateString(),
        updatedAt: new Date(typeConge._doc.updatedAt).toDateString()
    }
}

// fonction to transform typeAbsence
const typeAbsenceTransform = typeAbsence =>{
    return {
        ...typeAbsence._doc,
        Id: typeAbsence._doc._id,
        createdAt: new Date(typeAbsence._doc.createdAt).toDateString(),
        updatedAt: new Date(typeAbsence._doc.updatedAt).toDateString()
    }
}
// fonction to transform conge
const congeTransform = async conge => {
   try {
        return {
            ...conge._doc,
            Id: conge._doc._id,
            dateDebut: new Date(conge._doc.dateDebut).toDateString(),
            dateFin: new Date(conge._doc.dateFin).toDateString(),
            agent: agentTransform(await Agent.findById(conge._doc.agent)),
            createdAt: new Date(conge._doc.createdAt).toDateString(),
            updatedAt: new Date(conge._doc.updatedAt).toDateString()
        }
   } catch (error) {
       throw errors;
   }
}

// fonction to transform calendrier
const calendrierTransform = calendrier =>{
    return {
        ...calendrier._doc,
        Id: calendrier._doc._id,
        dateDebut: new Date(calendrier._doc.dateDebut).toDateString(),
        dateFin: new Date(calendrier._doc.dateFin).toDateString(),
        createdAt: new Date(calendrier._doc.createdAt).toDateString(),
        updatedAt: new Date(calendrier._doc.updatedAt).toDateString()
    }
}


// fonction to transform agent
const agentTransform = async (agent) =>{
    let congeTab = [];
    let autorisationTab = [];

    if(agent.conges){
        congeTab = agent.conges.map( async congeId => {
           try{
                const cong = await Conge.findById(congeId);
                if(!cong)
                    throw new Error("impossible de trouver un congé avec cette adresse email");

                return {
                    ...cong._doc,
                    Id: cong._id,
                    createdAt: new Date(cong._doc.createdAt).toDateString(),
                    updatedAt: new Date(cong._doc.updatedAt).toDateString()
                }
           }catch(err){
               return console.log(err.message);
           }
        } )
        
    }
    
    if(agent._doc.autorisationAbsences){
        autorisationTab = agent._doc.autorisationAbsences.map( async autorisationId => {
           try{
            const auto = await AutorisationAbsence.findById(autorisationId);
            return {
                ...auto._doc,
                Id: auto._doc._id,
                createdAt: new Date(auto._doc.createdAt).toDateString(),
                updatedAt: new Date(auto._doc.updatedAt).toDateString()
            }
           }catch(err){
               console.log(err);
               throw err
           }
        } )
        
    }
    // console.log(congeTab)
    return {
        ...agent._doc,
        Id: agent._doc._id,
        division: transform(await Division.findById(agent._doc.division)),
        conges: congeTab,
        autorisationAbsences: autorisationTab,
        createdAt: new Date(agent._doc.createdAt).toDateString(),
        updatedAt: new Date(agent._doc.updatedAt).toDateString()
    }
}

// fonction to transform autorisation absence
const autorisationAbsenceTransform = async (autorisationAbsence) => {
    const agent = await Agent.findById(autorisationAbsence._doc.agent);
    return {
        ...autorisationAbsence._doc,
        Id: autorisationAbsence._doc._id,
        agent,
        typeAbsence : typeAbsenceTra*nsform(await typeAbsence.findById(autorisationAbsence._doc.typeAbsence)),
        createdAt: new Date(agent._doc.createdAt).toDateString(),
        updatedAt: new Date(agent._doc.updatedAt).toDateString()
    }
    
}
// fonction to transform compte 
const compteTransform = async (compte) => {
    const agent = await Agent.findById(compte._doc.agent);

    return {
        ...compte._doc,
        Id: compte._doc._id,
        agent,
        createdAt: new Date(agent._doc.createdAt).toDateString(),
        updatedAt: new Date(agent._doc.updatedAt).toDateString()
    }
    
}


module.exports = {
    transform,
    statusTransform,
    typeCongeTransform,
    typeAbsenceTransform,
    congeTransform,
    calendrierTransform,
    agentTransform,
    autorisationAbsenceTransform,
    compteTransform
}