import { Link } from "react-router-dom"
import { mockTeams } from "../data/mockData"

export function Teams() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-fg-primary mb-4">
          Meet the Teams
        </h1>
        <p className="text-fg-secondary text-lg max-w-2xl mx-auto">
          Discover the innovative teams building on Solana. Learn about their achievements and vision for the future.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {mockTeams.map((team) => {
          return (
            <Link
              key={team.id}
              to={`/teams/${team.id}`}
              className="bg-bg-secondary border border-bd-primary rounded-xl p-8 hover:border-spark-primary transition-all hover:shadow-lg hover:shadow-spark-primary/20"
            >
              <div className="flex items-start gap-6 mb-6">
                <div className="text-6xl">{team.logo}</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-fg-primary mb-2">
                    {team.name}
                  </h3>
                  <p className="text-fg-secondary text-sm mb-3">{team.tagline}</p>
                  <span className="inline-block px-3 py-1 bg-spark-primary/10 text-spark-primary text-xs font-semibold rounded-full border border-spark-primary/20">
                    {team.category}
                  </span>
                </div>
              </div>

              <p className="text-fg-tertiary text-sm mb-6 leading-relaxed">
                {team.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {team.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-bg-tertiary text-fg-secondary text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm pt-4 border-t border-bd-secondary">
                <div className="text-fg-tertiary">
                  👥 {team.members} members
                </div>
                {team.website && (
                  <div className="text-spark-primary font-semibold">
                    Visit Website →
                  </div>
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
