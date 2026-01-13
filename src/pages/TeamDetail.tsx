import { useParams, Link } from "react-router-dom"
import { mockTeams, mockTeamMembers } from "../data/mockData"

export function TeamDetail() {
  const { id } = useParams()
  const team = mockTeams.find((t) => t.id === id)
  const members = mockTeamMembers[id || ""] || []

  if (!team) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-fg-primary">Team not found</h1>
        <Link to="/teams" className="text-spark-primary hover:underline mt-4 inline-block">
          ← Back to Teams
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Back button */}
      <Link
        to="/teams"
        className="inline-flex items-center text-spark-primary hover:underline mb-8"
      >
        ← Back to Teams
      </Link>

      {/* Team Header */}
      <div className="bg-bg-secondary border border-bd-primary rounded-xl p-8 mb-8">
        <div className="flex items-start gap-6 mb-6">
          <div className="text-8xl">{team.logo}</div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-fg-primary mb-2">
              {team.name}
            </h1>
            <p className="text-xl text-spark-primary mb-4">{team.tagline}</p>
            <span className="inline-block px-4 py-2 bg-spark-primary/10 text-spark-primary text-sm font-semibold rounded-full border border-spark-primary/20 mb-4">
              {team.category}
            </span>
            <p className="text-fg-secondary mb-6 leading-relaxed">{team.description}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {team.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-bg-tertiary text-fg-secondary text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex gap-4 text-sm">
              {team.website && (
                <a
                  href={team.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-spark-primary hover:underline font-semibold"
                >
                  🌐 Visit Website
                </a>
              )}
              {team.twitter && (
                <span className="text-fg-secondary">🐦 {team.twitter}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      {team.achievements && team.achievements.length > 0 && (
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-fg-primary mb-6">✨ Key Achievements</h2>
          <div className="bg-bg-secondary border border-bd-primary rounded-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {team.achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-bg-tertiary rounded-lg"
                >
                  <div className="text-spark-primary text-xl mt-1">✓</div>
                  <p className="text-fg-secondary flex-1">{achievement}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Team Members */}
      {members.length > 0 && (
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-fg-primary mb-6">👥 Team Members</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member, index) => (
              <div
                key={index}
                className="bg-bg-secondary border border-bd-primary rounded-xl p-6 hover:border-spark-primary transition-all"
              >
                <div className="text-6xl mb-4">{member.avatar}</div>
                <h3 className="text-xl font-bold text-fg-primary mb-1">
                  {member.name}
                </h3>
                <p className="text-spark-primary text-sm mb-3 font-semibold">{member.role}</p>
                <p className="text-fg-tertiary text-sm mb-4 leading-relaxed">{member.bio}</p>
                {member.twitter && (
                  <a
                    href={`https://twitter.com/${member.twitter.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-fg-secondary hover:text-spark-primary text-sm transition-colors"
                  >
                    🐦 {member.twitter}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
